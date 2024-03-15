name = input("What is your name? ")

file = open("./names.txt", "w")
file.write(name)
file.close()
