"use strict";
// Copyright ©2000-2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:15514145251199788621 LICENSE.md
// Thursday, November 27, 2025 - 2:02:54 PM

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
