require 'rubygems'
require 'sinatra'
require 'openssl'

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
set :public_folder, '.'
set :port, 9494

get '/' do
  send_file 'index.html'
end
