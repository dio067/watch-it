#! /usr/bin/env node
const chokidar = require("chokidar");
const chalk = require("chalk");
const debounce = require("lodash.debounce");
const prog = require("caporal");
const fs = require("fs");
const { spawn } = require("child_process");

prog
	.version("1.0.1")
	.argument("[filename]", "Name of the file to excute")
	.action(async ({ filename }) => {
		const name = filename;

		try {
			await fs.promises.access(name);
		} catch {
			throw new Error(`Could not find the file ${name}`);
		}

		let proc;
		const start = debounce(() => {
			if (proc) {
				proc.kill();
			}
			console.log(chalk.bold(chalk.green(">>>Starting the process!")));
			proc = spawn("node", [`${name}`], { stdio: "inherit" });
		}, 100);

		chokidar
			.watch(".")
			.on("add", start)
			.on("change", start)
			.on("unlink", start);
	});
prog.parse(process.argv);
