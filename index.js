"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:49233848941661900396 LICENSE.md

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
  VLA: pkg.VLA,
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
      const echo = this.methods.echo('wall', 'q', packet);
    },
    'devacore:answer'(packet) {
      const echo = this.methods.echo('wall', 'a', packet);
    }    
  },
  modules: {},
  devas: {},
  func: {
    echostr(opts) {
      const {id, agent, client, md5, sha256, sha512} = opts;
      const created = Date.now();

      this.action('func', `echostr:${id}`);
      this.state('set', `echostr:${id}`);
      const echostr = [
        `::begin:wall:${id}`,
        `transport: ${id}`, 
        `client: ${client.profile.id}`, 
        `agent: ${agent.profile.id}`, 
        `created: ${created}`, 
        `md5: ${md5}`, 
        `sha256:${sha256}`, 
        `sha512:${sha512}`,
        `::end:wall:${id}`,
      ].join('\n');

      // stub for later features right now just echo into the system process for SIGINT monitoring.
      const echo = spawn('echo', [echostr])
      echo.stderr.on('data', err => {
        this.error(err, opts);
      });
      
      this.state('return', `echostr:${id}`);
      return echostr;
    }
  },
  methods: {},
  onInit(data, resolve) {
    const {personal} = this.license(); // get the license config
    const agent_license = this.info().VLA; // get agent license
    const license_check = this.license_check(personal, agent_license); // check license
    // return this.start if license_check passes otherwise stop.
    return license_check ? this.start(data, resolve) : this.stop(data, resolve);
  },
  onReady(data, resolve) {
    const {VLA} = this.info();
    this.prompt(`${this.vars.messages.ready} > VLA:${VLA.uid}`);
    return resolve(data);
  },
  onError(data, err, reject) {
    this.prompt(this.vars.messages.error);
    console.log(err);
    return reject(err);
  },
});
export default WALL

