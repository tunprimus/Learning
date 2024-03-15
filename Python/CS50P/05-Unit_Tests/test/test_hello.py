from hello_better01 import hello

def test_default():
    assert hello() == "hello, world"

def test_argument():
    assert hello("Tun") == "hello, Tun"
