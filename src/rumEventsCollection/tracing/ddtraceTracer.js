// === Generate a random 64-bit number in fixed-length hex format
function randomTraceId() {
  const digits = '0123456789abcdef';
  let n = '';
  for (let i = 0; i < 19; i += 1) {
    const rand = Math.floor(Math.random() * 10);
    n += digits[rand];
  }
  return n;
}
/**
 * 
 * @param {*} configuration  配置信息
 */
export function DDtraceTracer(configuration) {
   this._spanId = randomTraceId()
   this._traceId = randomTraceId()
}
DDtraceTracer.prototype = {
  isTracingSupported: function() {
    return true
  },
  getSpanId:function() {
    return this._spanId
  },
  getTraceId: function() {
    return this._traceId
  },
  makeTracingHeaders: function() {
    return {
      'x-datadog-origin': 'rum',
      // 'x-datadog-parent-id': spanId.toDecimalString(),
      'x-datadog-sampled': '1',
      'x-datadog-sampling-priority': '1',
      'x-datadog-trace-id': this.getTraceId()
    }
  }
}