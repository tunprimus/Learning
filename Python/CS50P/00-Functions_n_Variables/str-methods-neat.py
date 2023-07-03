# Ask user for their name and clean it up
name = input("What's your name? ").strip().title()

# Split user's name into first name and last name
first, last = name.split(" ")

# Say hello to user
print(f"Hello, {first}!")
print(f"Hello, {last}!")