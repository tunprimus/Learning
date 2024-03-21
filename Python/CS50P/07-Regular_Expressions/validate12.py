import re

email = input("What is your email? ").strip()

if re.search(r"^[\w|\s]+@\w+\.edu$", email):
    print("Valid")
else:
    print("Invalid")
