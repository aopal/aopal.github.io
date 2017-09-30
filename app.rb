require 'rubygems'
require 'sinatra'
require 'sinatra-index'

set :public_folder, '.'

get '/' do
  send_file 'index.html'
end
