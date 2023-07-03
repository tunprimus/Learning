# Ask user for their name
name = input("What's your name? ")

# Remove whitespace from str
name = name.strip()

# Capitalise the name
name = name.capitalize()

# Change the first character of every word to upper case
name = name.title()

# Remove whitespace from str and convert to title cases
name = name.strip().title()

# Say hello to user
print(f"Hello, {name}!")