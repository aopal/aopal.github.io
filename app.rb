require 'rubygems'
require 'sinatra'

set :public_folder, '.'

get "/" do
  redirect '/index.html'
end