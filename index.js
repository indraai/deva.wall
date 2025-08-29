// Copyright (c)2025 Quinn Michaels
// Wall Deva

import Deva from '@indra.ai/deva';
import pkg from './package.json' with {type:'json'};
const {agent,vars} = pkg.data;

import {exec, spawn}  from 'node:child_process';

// set the __dirname
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';    
const __dirname = dirname(fileURLToPath(import.meta.url));

const info = {
  id: pkg.id,
  name: pkg.name,
  version: pkg.version,
  author: pkg.author,
  describe: pkg.description,
  dir: __dirname,
  url: pkg.homepage,
  git: pkg.repository.url,
  bugs: pkg.bugs.url,
  license: pkg.license,
  copyright: pkg.copyright
};

const WALL = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {return input.trim();},
    parse(input) {return input.trim();},
    process(input) {return input.trim();},
  },
  listeners: {
    'devacore:question'(packet) {
      const md5 = this.lib.hash(packet, 'md5');
      const sha256 = this.lib.hash(packet, 'sha256');
      const sha512 = this.lib.hash(packet, 'sha512');
      const echostr = `transport: ${packet.id} md5:${md5} | sha256:${sha256} | sha512:${sha512} | created:${packet.created}`;
      // stub for later features right now just echo into the system process for SIGINT monitoring.
      exec(`echo "${echostr}"`, (error, stdout, stderr) => {
        if (error) {
          console.log('error', error);        
        }
        else if (stderr) {
          console.log('stderr', stderr);
        }
      });
    },
    'devacore:answer'(packet) {
      const md5 = this.lib.hash(packet, 'md5');
      const sha256 = this.lib.hash(packet, 'sha256');
      const sha512 = this.lib.hash(packet, 'sha512');
      const echostr = `transport: ${packet.id} md5:${md5} | sha256:${sha256} | sha512:${sha512} | created:${packet.created}`;
      // stub for later features right now just echo into the system process for SIGINT monitoring.
      exec(`echo "${echostr}"`, (error, stdout, stderr) => {
        if (error) {
          console.log('error', error);        
        }
        else if (stderr) {
          console.log('stderr', stderr);
        }
      });
    }
  },
  modules: {},
  devas: {},
  func: {},
  methods: {},
  onReady(data, resolve) {
    this.prompt(this.vars.messages.ready);
    this.vars.userinfo = this.lib.os.userInfo();

    console.log('userinfo', this.vars.userinfo);
    return resolve(data);
    
  },
  onError(data, err, reject) {
    this.prompt(this.vars.messages.error);
    console.log(err);
    return reject(err);
  },
});
export default WALL

