// const fetch = require('node-fetch');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

module.exports = async function (fastify, options) {
    fastify.get("/install-app", async function (req, reply) {
        const bundlePath = 'public/assets/js/bundle.js';

        if (fs.existsSync(bundlePath)) {
            return reply.redirect('/');
        } else {
            return reply.sendFile('install.html');
        }
    });
    fastify.post("/omegly-verify", async function (req, reply) {
        const downloadFile = async (url, path) => {
            console.log(url);
            const response = await fetch('http://localhost:3000/omegly-install', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, purchaseCode }),
            });
            if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
            await pipelineAsync(response.body, fs.createWriteStream(path));
        };

        const checkDir = async (path) => {
            return fs.existsSync(path);
        };

        const { url, purchaseCode } = req.body;

        try {
            const response = await fetch('http://localhost:3000/omegly-install', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, purchaseCode }),
            });

            if (response.status === 200) {
                const bundlePath = 'public/assets/js/bundle.js';
                const alreadyInstalled = await checkDir(bundlePath);

                if (!alreadyInstalled) {
                    await downloadFile(url, bundlePath);
                    console.log('File downloaded successfully');
                    reply.status(response.status).send();
                } else {
                    console.log('File already installed');
                    reply.status(204).send();
                }
            } else {
                reply.status(response.status).send();
                console.error('Failed to build bundle');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
};