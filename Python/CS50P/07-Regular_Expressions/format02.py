import re

name = input("What is your name? ").strip()
matches = re.search(r"^(.+), (.+)$", name)
if matches:
    last = matches.groups(1)
    first = matches.groups(2)
    name = f"{first} {last}"
print(f"hello, {name}")
