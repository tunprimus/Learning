import argparse

parser = argparse.ArgumentParser(description="Meow like a cat")
parser.add_argument("-n", default=1, help="number of times to meow")
args = parser.parse_args()

for _ in range(args.n):
    print("meow")
