# js13kGame

Initialisation
    1. Load flights from config
        a). Loop through flights and create instance of `Flight`
    2. `loadPassengers` for each `Flight` based on number from config
        a). Loop through number of passengers and create `Player` instance
    3. `addLuggage` for each `Player`
        a). based on config min/max create `Luggage` instance with random size/colors

Game Loop
    1. Update
        a). Loop through `flights` and compare game time with the flight time on `hasLanded()`.
        b). If landed change the `Flight` `status` to `LANDED`
        c). Add 10 sec or some random delay and spawn `passengers` in the `lobby` (mark specific tiles and spawn players there so they are not on the same tile)
        d). Check which `belt` is free, update `Flight` `status` and loop through all `passengers` bugs and spawn it then.