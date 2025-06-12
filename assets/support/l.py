#!python3

file1 = open("l.txt","r")
lines = file1.readlines()
file1.close()

lines = [ l.strip().split(",") for l in lines]

for i,a in enumerate(lines):
    x = a[0]
    y = a[1]

    # print(f"i = {i}")
    # print(f"x = {x}")
    # print(f"y = {y}")

    print("\t{")
    print(f"\t\t\"id\" : {i},")
    print(f"\t\t\"x\" : {x},")
    print(f"\t\t\"y\" : {y}")
    print("\t},")
