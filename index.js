const aws = require('aws-sdk');

function calculate(x, y, op) {
  return new Promise((resolve, reject) => {
    const client = new aws.Lambda({
      region: 'us-east-2'
    })
    const params = {
      FunctionName: 'calculator',
      Payload: JSON.stringify({
        x,
        y,
        op
      })
    };

    client.invoke(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (JSON.parse(data.Payload).errorType) {
          resolve(JSON.parse(data.Payload).errorMessage);
        }
        const result = parseInt(data.Payload);
        resolve(result);
      }
    });
  });
}

(async () => {
  const result = await calculate(2, 2, '.');
  console.log(result);
})();