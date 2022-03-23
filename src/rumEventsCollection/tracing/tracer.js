
import {each, extend, getOrigin} from '../../helper/utils'
import {TraceType} from '../../helper/enums'
import { DDtraceTracer} from './ddtraceTracer'
import { SkyWalkingTracer} from './skywalkingTracer'
import { JaegerTracer} from './jaegerTracer'
import { ZipkinSingleTracer} from './zipkinSingleTracer'
import { ZipkinMultiTracer} from './zipkinMultiTracer'
import { W3cTraceParentTracer} from './w3cTraceParentTracer'

export function clearTracingIfCancelled(context) {
  if (context.status === 0) {
    context.traceId = undefined
    context.spanId = undefined
  }
}

export function startTracer(configuration) {
  return {
    clearTracingIfCancelled: clearTracingIfCancelled,
    traceXhr: function (context) {
      return injectHeadersIfTracingAllowed(
        configuration,
        context,
        function (tracingHeaders) {
          context.option = extend({}, context.option)
          var header = {}
          if (context.option.header) {
            each(context.option.header, function (value, key) {
              header[key] = value
            })
          }
          context.option.header = extend(header, tracingHeaders)
        }
      )
    }
  }
}
function isAllowedUrl(configuration, requestUrl) {
  var requestOrigin = getOrigin(requestUrl)
  var flag = false
  each(configuration.allowedTracingOrigins, function (allowedOrigin) {
    if (
      requestOrigin === allowedOrigin ||
      (allowedOrigin instanceof RegExp && allowedOrigin.test(requestOrigin))
    ) {
      flag = true
      return false
    }
  })
  return flag
}

export function injectHeadersIfTracingAllowed(configuration, context, inject) {
  if (!isAllowedUrl(configuration, context.url) || !configuration.traceType) {
    return
  }
  var tracer;
  switch(configuration.traceType) {
    case TraceType.DDTRACE: 
      tracer = new DDtraceTracer();
      break;
    case TraceType.SKYWALKING_V3:
      tracer = new SkyWalkingTracer(configuration, context.url);
      break;
    case TraceType.ZIPKIN_MULTI_HEADER:
      tracer = new ZipkinMultiTracer(configuration);
      break;
    case TraceType.JAEGER:
      tracer = new JaegerTracer(configuration);
      break;
    case TraceType.W3C_TRACEPARENT:
      tracer = new W3cTraceParentTracer(configuration);
      break;
      case TraceType.ZIPKIN_SINGLE_HEADER:
        tracer = new ZipkinSingleTracer(configuration);
        break;
    default:
      break;
  }
  if (!tracer || !tracer.isTracingSupported()) {
    return
  }

  context.traceId = tracer.getTraceId()
  context.spanId = tracer.getSpanId()
  inject(tracer.makeTracingHeaders())
}
