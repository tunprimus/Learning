with open("./names.txt") as file:
    for line in file:
        print("hello,", line.rstrip())
