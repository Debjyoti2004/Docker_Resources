package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// Calculator handles arithmetic operations
type Calculator struct{}

// Calculate performs the requested arithmetic operation
func (c Calculator) Calculate(expression string) (int, error) {
	parts := strings.Fields(expression)
	if len(parts) != 3 {
		return 0, fmt.Errorf("Invalid input format. Please use: number operator number")
	}

	left, err := strconv.Atoi(parts[0])
	if err != nil {
		return 0, fmt.Errorf("Invalid number: %s", parts[0])
	}

	right, err := strconv.Atoi(parts[2])
	if err != nil {
		return 0, fmt.Errorf("Invalid number: %s", parts[2])
	}

	switch parts[1] {
	case "+":
		return left + right, nil
	case "-":
		return left - right, nil
	case "*":
		return left * right, nil
	case "/":
		if right == 0 {
			return 0, fmt.Errorf("Division by zero is not allowed")
		}
		return left / right, nil
	default:
		return 0, fmt.Errorf("Invalid operator: %s", parts[1])
	}
}

func main() {
	fmt.Println("\n🚀 Welcome to the Modern Calculator App by Debjyoti! 🚀\n")
	calculator := Calculator{}
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Println("\n🔢 Ready to crunch numbers? Enter your calculation (e.g., 3 + 4, 10 * 5) or type 'exit' to stop:")
		fmt.Print("🖊️ Your input: ")
		text, _ := reader.ReadString('\n')
		text = strings.TrimSpace(text)

		if text == "exit" {
			fmt.Println("\n👋 Exiting calculator. See you next time!\n")
			break
		}

		result, err := calculator.Calculate(text)
		if err != nil {
			fmt.Println("Error:", err)
			continue
		}

		fmt.Printf("\n✅ Answer: %d\n", result)
	}
}
