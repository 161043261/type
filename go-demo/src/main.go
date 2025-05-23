package main

import fiberV2 "github.com/gofiber/fiber/v2"

func main() {
	app := fiberV2.New()
	app.Get("/", func(c *fiberV2.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Listen(":3000")
}
