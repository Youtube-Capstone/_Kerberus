#! /bin/bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
pyenv activate capstone
python /home/ubuntu/hanyang_cooperation/src/integrate_v2.py
python /home/ubuntu/hanyang_cooperation/src/sentimental.py
