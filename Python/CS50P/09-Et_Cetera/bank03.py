balance = 0

def main():
    print("Balance:", balance)
    deposit(100)
    withdraw(50)
    print("Balance:", balance)

def deposit(num):
    global balance
    balance += num

def withdraw(num):
    global balance
    balance -= num

if __name__ == "__main__":
    main()