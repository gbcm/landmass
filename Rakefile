require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

task 'jasmine:configure' => :set_jasmine_config_path

task :set_jasmine_config_path do
  ENV['JASMINE_CONFIG_PATH'] = 'spec/support/jasmine.yml'
end
