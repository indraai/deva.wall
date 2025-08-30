export default {
	async wall(packet) {
		this.state('set', `transport:${packet.id}`);
		const transport = packet.id; // set the transport from packet.id
		
		this.zone('wall', transport); // set the current zone to wall
		this.feature('wall', transport); // set the Wall feature.
		this.context('wall', transport); // set context to shield
		this.action('method', `wall:${transport}`); // action set to shield
		
		this.state('set', `uid:${transport}`); //set the uid state for the proxy
		const uid = this.lib.uid(true); // The UID for the proxy
		this.state('set', `time:${transport}`); //set the time state for the proxy
		const time = Date.now(); // current timestamp
		this.state('created', `created:${transport}`); //set the uid state for the proxy
		const created = this.lib.formatDate(time, 'long', true); // Formatted created date.
		
		this.state('set', `wall:${transport}`); //set the wall state for the proxy
		const guard = this.guard(); // load the Guard profile
		const {concerns} = guard; // load concerns from client guard profile.
		
		this.state('set', `agent:${transport}`); //set the agent state for the proxy
		const agent = this.agent(); // the agent processing the proxy
		
		this.state('set', `client:${transport}`); //set the client state for the proxy
		const client = this.client(); // the client requesting the proxy
		const {profile} = client; // set the client profile
		
		this.state('set', `meta:${transport}`); //set the meta state for the proxy
		const {meta} = packet.q; // set the meta information from the packet question.
		const {params} = meta; // set params from the meta information.
		
		this.state('set', `opts:${transport}`); //set the opts state for the proxy
		const opts = this.lib.copy(params); // copy the params and set as opts.
		
		this.state('set', `command:${transport}`); //set the opts state for the proxy
		const command = opts.shift(); // extract the command first array item out of opts.
		
		this.state('set', `message:${transport}`); //set the message state for the proxy
		const message = packet.q.text; // set packet.q.text as the message of the proxy.
		
		this.state('set', `profile:${transport}`); //set the profile constants state for the proxy
		const {name, fullname, nickname, title, write, religion, companies, ssn, emojis, warning, computer, hardware, provision, network, caseid, token, copyright} = profile; // constants saved from profile.
		
		this.state('set', `data:${transport}`); // set the state to set data 
		// data packet
		const data = {
			uid,
			transport,
			opts: opts.length? `:${opts.join(':')}` : '',
			time,
			agent,
			client,
			name,
			fullname,
			nickname,
			title,
			write,
			emojis,
			warning,
			religion,
			companies,
			message, 
			ssn,
			computer,
			hardware,
			provision,
			network,
			caseid,
			concerns,
			token,
			copyright,
			created,
		};
	
		this.state('hash', `md5:${transport}`); // set state to hash hashing
		data.md5 = this.lib.hash(data, 'md5'); // hash data packet into md5 and inert into data.
		
		this.state('hash', `sha256:${transport}`); // set state to hash hashing
		data.sha256 = this.lib.hash(data, 'sha256'); // hash data into sha 256 then set in data.
		
		this.state('hash', `sha512:${transport}`); // set state to hash hashing
		data.sha512 = this.lib.hash(data, 'sha512'); // hash data into sha 512 then set in data.
	
		this.state('set', `writestr:${transport}`);
		const writestr = data.write.split(' ').join(':').toUpperCase();
						
		const text = [
			'::::',
			`::BEGIN:${writestr}:WALL:${transport}:${data.emojis}`,
			`#VectorGuardWall${data.opts} ${data.message}`,
			`::begin:VectorGuardWall:${data.transport}`,
			`transport: ${data.transport}`,
			`agent: ${agent.profile.id}`,
			`client: ${client.profile.id}`,
			`name: ${data.name}`,
			`fullname: ${data.fullname}`,
			`nickname: ${data.nickname}`,
			`title: ${data.title}`,
			`token: ${data.token}`,
			`case: ${data.caseid}`,
			`time: ${data.time}`,
			`created: ${data.created}`,
			`copyright: ${data.copyright}`,
			`md5: ${data.md5}`,
			`sha256: ${data.sha256}`,
			`sha512: ${data.sha512}`,
			`::end:VectorGuardWall:${data.transport}`,
			`::END:${writestr}:WALL:${transport}:${data.emojis}`,
		].join('\n').trim();
		
		// send the text data to #feecting to parse and return valid text, html, and data.
		this.action('question', `feecting:parse:${transport}`); // action set to feecting parse 
		const feecting = await this.question(`${this.askChr}feecting parse ${text}`);
		return {
			text: feecting.a.text,
			html: feecting.a.html,
			data,
		}	  
	},
};
