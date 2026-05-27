# netchat
<p align="center">A simple python app that creates a basic chat room in your local network.</p>

<p align="center">
  <a href="https://pypi.org/project/netchat-app/"><img src="https://img.shields.io/pypi/v/netchat-app.svg" alt="PyPI Version"></a>
  <a href="https://pypi.org/project/netchat-app/"><img src="https://img.shields.io/pypi/l/netchat-app.svg" alt="License"></a>
  <a href="https://pyinstaller.readthedocs.io/en/stable/requirements.html"><img src="https://img.shields.io/badge/platform-any-lightgrey" alt="Supported Platforms"></a>
</p>

> [!WARNING]
> netchat is not a secure chatting app. This is nothing but a small project I made alone for my computer science class. Do not use it to discuss sensitive informations.

## Getting Started

### Prerequisites

- Python ≥ 3.6

### Installation and Usage

#### Installing via [PyPI](https://pypi.org/project/netchat-app/)

You can install this project using PyPI:

```
$ pip install netchat-app
```

Then to run it, execute the following in the terminal:

```
$ netchat
```

> You can also use the command `netchat-app`.

> If you have more than one version of Python installed, you can use `python -m netchat` instead of `netchat`.

#### Installing via [GitHub](https://github.com/samuellouf/netchat)

```
$ git clone https://github.com/samuellouf/netchat.git
$ cd netchat
$ pip install .
```

Then to run it, execute the following in the terminal:

```
$ netchat
```

> [!IMPORTANT]
> To uninstall it, run `pip uninstall netchat-app`

#### Running Locally via [Github](https://github.com/samuellouf/netchat) (no install)

You can run this project locally by following these steps:

1. Clone/download the [repo](https://github.com/samuellouf/netchat)
2. Open cmd/terminal and cd into the project's root folder
3. Execute `python -m pip install -r requirements.txt`
4. Execute `python -m netchat_app` to run the application

## Using netchat

> [!IMPORTANT]
> Your OS's firewall might ask for your permission to let Python local networks. You need to accept this.

First, you need to run netchat (`netchat` or `netchat-app`).

### On the machine running netchat
1. Open the server's adress in your navigator (it is probably `http://127.0.0.1:5000`).
2. Create an account

And that's it! You have your account and you can start chatting.

### On an other machine in the same network
1. Check that netchat is running on all adresses (0.0.0.0)
   - Unless you have used the `--host` argument, netchat should already be accessible by the network
2. Get the IP adress of the machine running netchat and the port it is running on
   - If you have opened netchat's gui on the server, the IP and port should be displayed at the top of the page.
3. Open the server in your navigator (`http://[server ip]:[port]/`)
4. Create an account

You now have your account and you can start chatting.

### Arguments

You can get all of these informations by using the help flag: `netchat --help`

| Argument                 | Description                                                                                      |
|--------------------------|--------------------------------------------------------------------------------------------------|
| -h, --help               | shows a help message and exit                                                                    |
| -v, --version            | show netchat's version number and exit                                                           |
| --host [HOST]            | the hostname to listen on. default is 0.0.0.0 to make the server available to the whole network. |
| -p [PORT], --port [PORT] | the port to serve on. default is 5000.                                                           |
| -d, --debug              | debug informations in the navigator                                                              |

## Contributing

If you ever want to contribute, simply open a pull request explaining.

I will probably add some new features in a while.

## Issues & Bugs

If you found an issue or bug, don't hesitate to report it [here](https://github.com/samuellouf/netchat/issues).

> Btw, I took this readme's structure from auto_py_to_exe
