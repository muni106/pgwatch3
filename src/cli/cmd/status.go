package cmd

import (
	"fmt"
	"net/http"

	"github.com/spf13/cobra"
)

var statusCmd = &cobra.Command{
	Use:   "status",
	Short: "Check the status of the pgwatch instance running",
	Long:  "work in progress",
	RunE: func(cmd *cobra.Command, args []string) (err error) {
		url := args[0]
		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("we got an error: ", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			fmt.Println("pgwatch is running on: ", url)
		}
		return nil
	},
}
