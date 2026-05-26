import argparse
from . import __version__

def main():
  parser = argparse.ArgumentParser(
    prog='NetChat',
    description='A simple python app that creates a basic chat room in your local network.',
  )
  
  parser.add_argument("-v", "--version", action="version", version=f"netchat-app {__version__}")
  
  parser.add_argument(
    "--host",
    nargs="?",
    help="the hostname to serve on. default is 0.0.0.0 to make the server available to the whole network.",
    default="0.0.0.0",
  )
  
  parser.add_argument(
    "-p",
    "--port",
    nargs="?",
    help="the port to serve on. default is 5000.",
    default=5000,
  )
  
  parser.add_argument(
    "-d",
    "--debug",
    help="debug informations in the navigator",
    default=False,
  )
  
  args = parser.parse_args()
  
  from . import app
  app.run(host=args.host, port=args.port, debug=args.debug)
  print("CTRL+C was pressed. Shutting down the server...")

if __name__ == "__main__":
  main()
