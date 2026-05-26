from io import open

from setuptools import setup

from netchat_app import __version__, __license__

setup(
  name="netchat-app",
  version=__version__,
  url="https://samuellouf.github.io/netchat",
  license=__license__,
  author="SamuelLouf",
  author_email="samuelloufcoder@gmail.com",
  description="A simple python app that creates a basic chat room in your local network.",
  long_description="".join(open("README.md", encoding="utf-8").readlines()),
  long_description_content_type="text/markdown",
  project_urls={
    "Source Code": "https://github.com/samuellouf/netchat",
    "Bug Tracker": "https://github.com/samuellouf/netchat/issues",
    "Changelog": "https://github.com/samuellouf/netchat/blob/master/CHANGELOG.md",
  },
  keywords=["gui", "server", "chat", "executable"],
  packages=["netchat_app"],
  include_package_data=True,
  install_requires=["flask"],
  python_requires=">=3.6",
  classifiers=[
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Operating System :: OS Independent",
  ],
  entry_points={
    "console_scripts": ["netchat=netchat_app.__main__:run", "netchat-app=netchat_app.__main__:run"],
  }
)
