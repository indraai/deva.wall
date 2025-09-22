"use strict";
// Copyright ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:49233848941661900396 LICENSE.md

export default {
	/**************
	method: wall
	params: packet
	describe: The global wall feature that installs with every agent
	***************/
	async wall(packet) {
		const wall = await this.methods.sign('wall', 'default', packet);
		return wall;
	},
};
