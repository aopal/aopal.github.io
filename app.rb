require 'rubygems'
require 'sinatra'
require 'openssl'
require 'sendgrid-ruby'
include SendGrid

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
set :public_folder, '.'
sendgrid = SendGrid::API.new(api_key: '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')

get '/' do
  send_file 'index.html'
end

post '/contact' do
  from = Email.new(email: params['email'])
  to = Email.new(email: 'anuj@aopal.ca')
  subject = "Contact request from personal website"
  content = Content.new(type: 'text/plain', value: params['message'])
  mail = Mail.new(from, subject, to, content)
  response = sendgrid.client.mail._('send').post(request_body: mail.to_json)
  status 204
end
