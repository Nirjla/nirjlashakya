class InvalidError(Exception):
    pass


class Bank:
    def __init__(self):
        self.password = ""
        self.mobile = ""
        self.has_uppercase = False
        self.has_lowercase = False
        self.has_special = False
        self.has_number = False
        self.option()

    def option(self):
        try:
            print(" ============================================")
            print("|                                           |")
            print("|       $$ Welcome to Horizon Bank$$        |")
            print("|                                           |")
            print(" ===========================================")
            print("|                                           |")
            print("|                Main Menu:                 |")
            print("|                                           |")
            print("|              [1] Create New Account       |")
            print("|                                           |")
            print("|              [2] Already have an account  |")
            print("|                                           |")
            print("|                                           |")
            print(" ===========================================")

            user_input = int(input("Enter your option: "))

            if user_input == 1:
                self.mobileNum()
                self.storePassword()
                self.menu()

            elif user_input == 2:
                self.menu()

            else:
                raise InvalidError("Wrong Option Alert!!")
        except InvalidError as e:
            print(f"Error:{str(e)}")
            self.option()
    # def welcome(self):
    #     print("Welcome to Discord Banking Ltd")
    #     self.menu()

    def storePassword(self):
        self.password = input("Enter your password:")
        checkLength = len(self.password)
        if checkLength < 8:
            print("Your password must be more than eight characters")
            self.storePassword()

        else:
            for char in self.password:
                if char.isupper():
                    self.has_uppercase = True
                if char.islower():
                    self.has_lowercase = True
                if char.isdigit():
                    self.has_number = True
                else:
                    self.has_special = True
            if not (self.has_uppercase and self.has_lowercase and self.has_number and self.has_special):
                raise InvalidError(
                    "Your password must include at least one uppercase letter, one lowercase letter, one special character, and one number.")

            # else:
            print("Strong Password!")

    def menu(self):

        print(" ===========================================")
        print("|                                           |")
        print("|              Banking services:            |")
        print("|                                           |")
        print("|           [1] Cash Deposit                |")
        print("|                                           |")
        print("|           [2] Withdraw                    |")
        print("|                                           |")
        print("|           [3] Transaction History         |")
        print("|                                           |")
        print("|           [4] Total balance               |")
        print("|                                           |")
        print("|                                           |")
        print(" ===========================================")

        user_input = int(input("Enter your option: "))
        if user_input == 1:
            self.storeDeposit()
        elif user_input == 2:
            self.withdraw()
        elif user_input == 3:
            self.viewHistory()
        else:
            self.totalBalance()

    def storeDeposit(self):
        try:
            self.askAmount = int(input("Deposit Amount: \n "))
            self.askSource = int(
                input("Source of Fund: \n1:Salary Income \n2.Business Income \n 3.Borrowing\n"))
            print("Enter your option:")
            if self.askSource == 1 or self.askSource == 2 or self.askSource == 3:
                self.storeInfo()
        except InvalidError as e:
            raise "Error:{str(e)}"
        else:
            print(f"Rs.{self.askAmount} has been successfully deposited.")
            self.menu()

    def mobileNum(self):
        self.mobile = input("Enter your mobile number: ")
        mobile_number = self.mobile
        if not mobile_number.isdigit():
            raise InvalidError("You should be usings digits.")

        checkLength = len(self.mobile)
        if checkLength > 10 or checkLength < 10:
            print("You have entered wrong number.Please try again!")
            self.mobileNum()

    def storeInfo(self):
        with open("Banking_software\storeInfo.txt", "a") as f:
            f.write(
                f"Mobile number:{self.mobile}\nPassword:{self.password}\nDeposited Amount:{self.askAmount}\n Source of fund: {self.askSource}\n")

    def withdraw(self):
        mobile_number = input("Enter your mobile number: ")
        password = input("Enter your password: ")
        with open("Banking_software\storeInfo.txt", "r") as f:
            lines = f.readlines()
            transaction_found = False
            for i in range(len(lines)):
                if "Mobile number:" in lines[i] and mobile_number in lines[i]:
                    if "Password:" in lines[i+1] and password in lines[i+1]:
                        if "Deposited Amount:" in lines[i+2]:
                            transaction_found = True
                            deposited_amount = int(
                                lines[i+2].split(":")[1].strip())
                            break
            if transaction_found:
                withdraw_amount = int(
                    input("Enter the amount you want to withdraw: "))
                if withdraw_amount > deposited_amount:
                    print("Error:withdrawal amount exceeds deposited amount.")
                    return  # here if a function or method does not have a return statement it implicity returns None
                new_deposited_amount = deposited_amount - withdraw_amount
                new_lines = [f"Mobile number:{self.mobile}\n", f"Password:{self.password}\n",
                             f"Deposited Amount:{new_deposited_amount}\n", f"Source of fund:{self.askSource}\n"]
                with open("Banking_software\storeInfo.txt", "w") as f:
                    f.writelines(new_lines)
                print(f"Rs.{withdraw_amount} has been successfully withdrawn.")
            else:
                print(
                    "Error: no transaction history found for the provided mobile number and password.")
    def viewHistory(self):
        mobile_number = input("Enter your mobile number: ")
        password = input("Enter your password: ")

        with open("Banking_software\storeInfo.txt", "r") as f:
            transaction_found = False
            while True:
                line = f.readline()
                if not line:
                    break
                if "Mobile number:" in line and mobile_number in line:
                    next_line = f.readline().strip()
                    if "Password:" in next_line and password in next_line:
                        transaction_found = True
                        print("Transaction History:")
                        print("-------------------")
                        print(f.readline().strip())  # Deposited Amount
                        print(f.readline().strip())  # Source of fund
                        print("-------------------")
                if not transaction_found:
                  print(
                "No transaction history found for the provided account name and mobile number.")
                self.menu()
    def totalBalance(self):
        mobile_number = input("Enter your mobile number: ")
        password = input("Enter your password: ")
        with open("Banking_software\storeInfo.txt", "r") as f:
            lines = f.readlines()
            transaction_found = False
            for i in range(len(lines)):
                if "Mobile number:" in lines[i] and mobile_number in lines[i]:
                    if "Password:" in lines[i+1] and password in lines[i+1]:
                        if "Deposited Amount:" in lines[i+2]:
                            transaction_found = True
                            deposited_amount = int(
                                lines[i+2].split(":")[1].strip())
                            break
            if transaction_found:
                print(f"Your total balance is {deposited_amount}.")
            else:
                print(
                    "Error: no transaction history found for the provided mobile number and password.")

   

        if not transaction_found:
            print(
                "No transaction history found for the provided mobile number.")


o1 = Bank()
o1.option()


