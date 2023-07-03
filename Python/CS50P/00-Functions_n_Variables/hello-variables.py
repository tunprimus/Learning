# Ask user for their name
name = input("What's your name? ")

# Say hello to user
print("Hello, name!")
print("Hello,!")
print(name)
print("Hello," + name)
print("Hello, " + name)
print("Hello, ", name)
print("Hello,", name)

print("Hello, ", end="")
print(name)

print("Hello,", name, sep="???")

print(f"Hello, {name}!")