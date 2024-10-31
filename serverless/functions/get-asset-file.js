const TokenValidator = require('twilio-flex-token-validator').functionValidator

exports.handler = TokenValidator(function (context, event, callback) {
	const response = new Twilio.Response()
	response.appendHeader('Access-Control-Allow-Origin', '*')
	response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
	response.appendHeader('Access-Control-Allow-Headers', 'Content-Type')
	console.log('Access-Control-Allow-Origin:', 'http://localhost:3000')

	if (event.httpMethod === 'OPTIONS') {
		response.setStatusCode(200)
		callback(null, response)
		return
	}

	const fs = require('fs')
	const file = Runtime.getAssets()['/config.private.json'].path
	const text = fs.readFileSync(file).toString('utf-8')

	response.appendHeader('Content-Type', 'application/json')
	response.setBody(JSON.parse(text))

	callback(null, response)
})
