import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

// Uncomment these lines - they should not be commented out
Rails.start()
Turbolinks.start()
ActiveStorage.start()

// Import your custom JavaScript
import "../../assets/javascript/custom"