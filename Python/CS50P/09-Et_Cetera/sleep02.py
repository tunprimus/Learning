def main():
    num = int(input("What is num? "))

    for i in range(num):
        print(sheep(i))

def sheep(n):
    return "🐑" * n

if __name__ == "__main__":
    main()
