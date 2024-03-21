import re

email = input("What is your email? ").strip().lower()

if re.search(r"^[\w|\s]+@\w+\.edu$", email.lower()):
    print("Valid")
else:
    print("Invalid")
