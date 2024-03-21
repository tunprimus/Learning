import re

email = input("What is your email? ").strip()

# Regex pattern used by most browsers to validate email addresses in forms
if re.search(r"^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", email, re.IGNORECASE):
    print("Valid")
else:
    print("Invalid")
