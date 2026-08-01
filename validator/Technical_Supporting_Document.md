# Explorations in 2026

## Execution client
[Link to documentation](https://docs.ethrex.xyz/l1/running)

We are thinking on using ethrex (still pending an audit). To run the installed and built-from-source ethrex:

1. Clone the repo and build from source

    1. Fetch all tags: `git fetch --tags`
    1. Use the latest release tag: `git checkout tags/v22.0.0`
    1. Follow the instructions in their official documentation page
    1. E.g.: `cargo build --bin ethrex --release`
    1. For production: follow step number 4

2. Execute it:
```bash
ethrex --syncmode snap --network hoodi
```

3. Check if the node is already synced:
```bash
curl -X POST http://127.0.0.1:8545 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
```

4. Move it from `~/ethrex/target/release` to `/usr/local/bin` with:
```bash
sudo systemctl stop ethrex-mainnet
cp ~/ethrex/target/release/ethrex /usr/local/bin/ethrex
sudo chmod 755 /usr/local/bin/ethrex
sudo systemctl start ethrex-mainnet
```

## Consensus client
[Link to documentation](https://lighthouse-book.sigmaprime.io/installation_source.html)

We are still using Lighthouse due to it being written in Rust. To run the installed and built-from-source lighthouse:

1. Clone the repo and build from source

    1. Fetch all tags: `git fetch --tags`
    1. Use the latest release tag: `git checkout tags/v8.2.1`
    1. Follow the instructions in their official documentation page
    1. E.g.: `make`
    1. For production: follow step number 2

2. Remember to move it from ~/.cargo to /usr/local/bin/ with:
```bash
sudo systemctl stop lighthouse-beacon-mainnet
sudo systemctl stop lighthouse-validator-mainnet
sudo cp ~/.cargo/bin/lighthouse /usr/local/bin/
sudo chmod 755 /usr/local/bin/lighthouse
sudo systemctl start lighthouse-beacon-mainnet
sudo systemctl start lighthouse-validator-mainnet
```

3. Execute it:
```bash
lighthouse bn \
  --network hoodi \
  --execution-endpoint http://127.0.0.1:8551 \
  --execution-jwt /home/nnico/ethrex/jwt.hex \
  --checkpoint-sync-url https://hoodi.checkpoint.sigp.io \
  --http
```


## Users and groups

### Ethereum Hoodi Users
1. `ethrex-hoodi`
2. `lighthouse-beacon-hoodi`
3. `lighthouse-validator-hoodi`

### Ethereum Hoodi group
1. `ethereum-hoodi-shared` (to share jwt.hex file between users)

### Ethereum Mainnet Users
1. `ethrex-mainnet`
2. `lighthouse-beacon-mainnet`
3. `lighthouse-validator-mainnet`
4. `mev-boost-mainnet`

### Ethereum Mainnet group
1. `ethereum-mainnet-shared` (to share jwt.hex file between users)

### Instructions

1. Create user for service: `sudo useradd --no-create-home --shell /bin/false <USERNAME_HERE>`

2. Create directory for service data: `sudo mkdir -p /var/lib/<USERNAME_HERE>`

3. Set permissions: `sudo chown -R <USERNAME_HERE>:<USERNAME_HERE> /var/lib/<USERNAME_HERE>`

4. Create users group: `sudo groupadd <GROUP_NAME_HERE>`



## Run ethrex as background service
A background service will start and restart every time the machine restarts. This will help us keep applications running at all time. Each application needs a user:

1. Create user for service: `sudo useradd --no-create-home --shell /bin/false ethrex-hoodi`

2. Create directory for service data: `sudo mkdir -p /var/lib/ethrex-hoodi`

3. Set permissions: `sudo chown -R ethrex-hoodi:ethrex-hoodi /var/lib/ethrex-hoodi`

4. Create a config file for service: `sudo nano /etc/systemd/system/ethrex-hoodi.service` with the content:
```bash
[Unit]
Description=ethrex execution client in hoodi testnet
After=network.target
Wants=network.target

[Service]
User=ethrex-hoodi
Group=ethrex-hoodi
Type=simple
Restart=always
RestartSec=5
ExecStart=ethrex \
--syncmode snap \
--network hoodi \
--datadir /var/lib/ethrex-hoodi \
--authrpc.jwtsecret /jwt-hoodi.hex \
--http.port 8544 \
--authrpc.port 8550 \
--p2p.port 30302 \
--discover.port 30302

[Install]
WantedBy=multi-user.target
```

5. Reload the daemon services: `sudo systemctl daemon-reload`

6. Start the service: `sudo systemctl start ethrex-hoodi`

7. Check the service status: `sudo systemctl status ethrex-hoodi`

8. Check the logs in real time: `journalctl -u ethrex-hoodi -f`

9. Make it automatically restart when reboot: `sudo systemctl enable ethrex-hoodi`



## Make a file shareable between users
This way both users (and their services) will be able to read the file.

1. Create users group: `sudo groupadd ethereum-hoodi-shared`

2. Add both user to the group: `sudo usermod -aG ethereum-hoodi-shared ethrex-hoodi`

3. Create file:
```bash
openssl rand -hex 32 | tr -d "\n" > jwt-hoodi.hex
```
*Remember that a jwt.hex file is generated where this command is used. The consensus client needs to know this path in order to authenticate. You can change the paths in the execution and the consensus client configuration*

4. Setup permissions:
```bash
sudo chown root:ethereum-hoodi-shared ./jwt-hoodi.hex
sudo chown 640 ./jwt-hoodi.hex
```

## Run lighthouse beacon as background service

1. Follow previous instructions but change the service config file (and its name `sudo nano /etc/systemd/system/lighthouse-beacon-hoodi.service`) with the following content:
```bash
[Unit]
Description=lighthouse beacon node client in hoodi testnet
After=network.target
Wants=network.target

[Service]
User=lighthouse-beacon-hoodi
Group=lighthouse-beacon-hoodi
Type=simple
Restart=always
RestartSec=5
ExecStart=lighthouse bn \
--network hoodi \
--execution-endpoint http://localhost:8550 \
--execution-jwt /jwt-hoodi.hex \
--checkpoint-sync-url https://hoodi.checkpoint.sigp.io \
--datadir /var/lib/lighthouse-beacon-hoodi \
--builder http://localhost:18549 \
--http \
--http-port 5051 \
--port 8998 \
--quic-port 8999

[Install]
WantedBy=multi-user.target
```

## Build and run ethstakers-cli
[Link to documentation](https://deposit-cli.ethstaker.cc/other_install_options.html)

You need to run this third-party app to generate your validator keys

1. Create a Python virtual environment: `python3 -m venv ethstaker-venv`

2. Activate the virtual environment: `source ethstaker-venv/bin/activate`

3. Clone the repo and install the dependencies

4. Use the tool with: `./deposit.sh new-mnemonic`

5. Use a password.

6. Save the mnemonic phrase

7. My keys can be found here: `/home/nnico/ethstaker-deposit-cli/validator_keys`


## Create validator wallet

1. Create a new directory: `sudo mkdir -p /var/lib/lighthouse-hoodi`

2. Change permission to current logged user: `sudo chown -R nnico:nnico /var/lib/lighthouse-hoodi`

3. Change permission to validator user because it will need to read the wallet data: `sudo chown -R lighthouse-validator-hoodi:lighthouse-validator-hoodi /var/lib/lighthouse-hoodi`

3. Use the **lighthouse** binary to create the wallet:
```bash
lighthouse account validator import \
--directory /home/nnico/ethstaker-deposit-cli/validator_keys  \
--network hoodi \
--datadir /var/lib/lighthouse-hoodi
```

4. For security reasons remove permissions of logged-in user: `sudo chown nnico:nnico /var/lib/lighthouse-hoodi`


## Run lighthouse validator as background service

1. Follow previous instructions but change the service config file (and its name `sudo nano /etc/systemd/system/lighthouse-validator-hoodi.service`) with the following content:
```bash
[Unit]
Description=lighthouse validator node client in hoodi testnet
After=network.target
Wants=network.target

[Service]
User=lighthouse-validator-hoodi
Group=lighthouse-validator-hoodi
Type=simple
Restart=always
RestartSec=5
ExecStart=lighthouse vc \
--network hoodi \
--beacon-nodes http://localhost:5051 \
--graffiti "nico is up" \
--builder-boost-factor 20 \
--datadir /var/lib/lighthouse-hoodi \
--suggested-fee-recipient 0x0000000000000000000000000000000000000000

[Install]
WantedBy=multi-user.target
```


# MEV

1. Install go. Remember that if the `make build` command does not work you will need to add this to /etc/resolv.conf:
```bash
nameserver 1.1.1.1
nameserver 8.8.8.8
```

2. Move the binary to the right directory and change the permissions: `sudo cp mev-boost /usr/local/bin/`

2. Create a user for the service `mev-boost-hood`

3. Create a service: `sudo nano /etc/systemd/system/mev-boost-hoodi.service`
```bash
[Unit]
Description=mev-boost client running in the hoodi network
Wants=network-online.target
After=network-online.target

[Service]
User=mev-boost-hoodi
Group=mev-boost-hoodi
WorkingDirectory=/var/lib/mev-boost-hoodi
Type=simple
Restart=always
RestartSec=5
ExecStart=mev-boost \
        -hoodi \
        -addr localhost:18549 \
        -relay-check \
        -relay https://0xafa4c6985aa049fb79dd37010438cfebeb0f2bd42b115b89dd678dab0670c1de38da0c4e9138c9290a398ecd9a0b3110@boost-relay-hoodi.flashbots.net \
        -relay https://0xaa58208899c6105603b74396734a6263cc7d947f444f396a90f7b7d3e65d102aec7e5e5291b27e08d02c50a050825c2f@hoodi.titanrelay.xyz \
        -relay https://0x821f2a65afb70e7f2e820a925a9b4c80a159620582c1766b1b09729fec178b11ea22abb3a51f07b288be815a1a2ff516@bloxroute.hoodi.blxrbdn.com \
        -relay https://0x98f0ef62f00780cf8eb06701a7d22725b9437d4768bb19b363e882ae87129945ec206ec2dc16933f31d983f8225772b6@hoodi.aestus.live


[Install]
WantedBy=multi-user.target
```



# Production

## Edit files
1. Ethrex: `sudo nano /etc/systemd/system/ethrex-mainnet.service`
1. Lighthouse Beacon: `sudo nano /etc/systemd/system/lighthouse-beacon-mainnet.service`
1. Lighthouse Validator: `sudo nano /etc/systemd/system/lighthouse-validator-mainnet.service`
1. MEV-Boost: `sudo nano /etc/systemd/system/mev-boost-mainnet.service`

## Restart services
```bash
# 0. Reload daemons
sudo systemctl daemon-reload
# 1. Ethrex:
sudo systemctl restart ethrex-mainnet
# 2. Lighthouse Beacon:
sudo systemctl restart lighthouse-beacon-mainnet
# 3. Lighthouse Validator:
sudo systemctl restart lighthouse-validator-mainnet
# 4. MEV-Boost:
sudo systemctl restart mev-boost-mainnet
# Optional: enable auto start
sudo systemctl enable ethrex-mainnet
sudo systemctl enable lighthouse-beacon-mainnet
sudo systemctl enable lighthouse-validator-mainnet
sudo systemctl enable mev-boost-mainnet
```

## Check logs
1. Ethrex: `journalctl -u ethrex-mainnet -f`
1. Lighthouse Beacon: `journalctl -u lighthouse-beacon-mainnet -f`
1. Lighthouse Validator: `journalctl -u lighthouse-validator-mainnet -f`
1. MEV-Boost: `journalctl -u mev-boost-mainnet -f`

## Users and groups
Please check the section above to avoid duplications and maintainance errors

## Service files
1. Ethrex
```bash
[Unit]
Description=ethrex execution client in mainnet
After=network.target
Wants=network.target

[Service]
User=ethrex-mainnet
Group=ethrex-mainnet
Type=simple
Restart=always
RestartSec=5
ExecStart=ethrex \
--syncmode snap \
--network mainnet \
--datadir /var/lib/ethrex-mainnet \
--authrpc.jwtsecret /jwt-mainnet.hex

[Install]
WantedBy=multi-user.target
```

2. Lighthouse Beacon
```bash
[Unit]
Description=lighthouse beacon node client in mainnet
After=network.target
Wants=network.target

[Service]
User=lighthouse-beacon-mainnet
Group=lighthouse-beacon-mainnet
Type=simple
Restart=always
RestartSec=5
ExecStart=lighthouse bn \
--network mainnet \
--execution-endpoint http://127.0.0.1:8551 \
--execution-jwt /jwt-mainnet.hex \
--checkpoint-sync-url https://mainnet.checkpoint.sigp.io \
--datadir /var/lib/lighthouse-beacon-mainnet \
--builder http://localhost:18550 \
--http

[Install]
WantedBy=multi-user.target
```

3. Lighthouse Validator
```bash
[Unit]
Description=lighthouse validator node client in mainnet
After=network.target
Wants=network.target

[Service]
User=lighthouse-validator-mainnet
Group=lighthouse-validator-mainnet
Type=simple
Restart=always
RestartSec=5
ExecStart=lighthouse vc \
--network mainnet \
--beacon-nodes http://localhost:5052 \
--graffiti "nico is up" \
--builder-boost-factor 20 \
--datadir /var/lib/lighthouse-mainnet \
--suggested-fee-recipient 0x0000000000000000000000000000000000000000

[Install]
WantedBy=multi-user.target
```

4. MEV-Boost
```bash
[Unit]
Description=mev-boost client running in mainnet
Wants=network-online.target
After=network-online.target

[Service]
User=mev-boost-mainnet
Group=mev-boost-mainnet
WorkingDirectory=/var/lib/mev-boost-mainnet
Type=simple
Restart=always
RestartSec=5
ExecStart=mev-boost \
        -mainnet \
        -addr localhost:18550 \
        -relay-check \
        -relay https://0x8b5d2e73e2a3a55c6c87b8b6eb92e0149a125c852751db1422fa951e42a09b82c142c3ea98d0d9930b056a3bc9896b8f@bloxroute.max-profit.blxrbdn.com \
        -relay https://0xb0b07cd0abef743db4260b0ed50619cf6ad4d82064cb4fbec9d3ec530f7c5e6793d9f286c4e082c0244ffb9f2658fe88@bloxroute.regulated.blxrbdn.com \
        -relay https://0x8c4ed5e24fe5c6ae21018437bde147693f68cda427cd1122cf20819c30eda7ed74f72dece09bb313f2a1855595ab677d@regional.titanrelay.xyz \
        -relay https://0xac6e77dfe25ecd6110b8e780608cce0dab71fdd5ebea22a16c0205200f2f8e2e3ad3b71d3499c54ad14d6c21b41a37ae@boost-relay.flashbots.net


[Install]
WantedBy=multi-user.target
```


5. Run `ethstakers-deposit-cli/deposit.sh` to create a validator keypair. Follow the instructions from the Launchpad website

6. Create Lighthouse validator wallet (run once and the configuration file will help the validator client fetch it every time)

- Create a new directory: `sudo mkdir -p /var/lib/lighthouse-mainnet`
- Change permission to current logged user: `sudo chown -R nnico:nnico /var/lib/lighthouse-mainnet`
- Use the **lighthouse** binary to create the wallet:
```bash
lighthouse account validator import \
--directory /home/nnico/ethstaker-deposit-cli/validator_keys  \
--network mainnet \
--datadir /var/lib/lighthouse-mainnet
```
- Change permission to validatora user because it will need to read the wallet dat: `sudo chown -R lighthouse-validator-mainnet:lighthouse-validator-mainnet /var/lib/lighthouse-mainnet`


# Ports

To check which ports a specific application or service is using perform the following steps:

1. Find the process id (PID): `sudo systemctl status ethrex-hoodi`
2. Check all ports that PID is listening to: `sudo ss -tulpn | grep 2847`
3. Compare the ports with the following table

| Application | Service | Hoodi | Mainnet |
|:-------:|:-----:|:-----:|:-------:|
| **Ethrex** | JSON-RPC (HTTP) | 8544 | 8545 (default)
| **Ethrex** | Engine API | 8550 | 8551 (default)
| **Ethrex** | P2P gossip network | 30302 | 30303 (default)
| **Lighthouse beacon** | Beacon API (HTTP REST) | 5051 | 5052 (default)
| **Lighthouse beacon** | P2P TCP/UPD | 8998 | 9000 (default)
| **Lighthouse beacon** | QUIC P2P | 8999 | 9001 (default. P2P +1)
| **Lighthouse validator**  | Validator | No ports | No ports
| **MEV-Boost**  | Builder API | 1849 | 18550 (default)
