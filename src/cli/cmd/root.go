package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "pwtcl",
	Short: "discuss with Pavlo",
	Long:  "before any important decision I think it would be a great idea to discuss with a mentor",
}

func init() {
	rootCmd.Flags().StringP("channel", "c", "", "host where pgwatch is running")
	

}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
