//MIT License - Copyright (c) 2020 Picorims

//TEMPLATE - TheFatRat & Anjulie - Close To The Sun

function Template() {

    new Background(
        {
            id: "background",
            layer: 0,
            background: "url('./experimentations/animé_jaune.jpg')",
            size: "100%",
        }
    );

    new Text(
        {
            id: "subtitle",
            layer: 100,
            x: 800,
            y: 100,
            width: 500,
            height: 100,
            rotation: 45,
            type: "any",
            text: "TheFatRat & Anjulie",
            font_size: 30,
            color: "rgb(255, 21, 21)",
            text_shadow: "rgb(33, 33, 33) 0px 0px 10px",
        }
    );

    new Text(
        {
            id: "title",
            layer: 100,
            x: 175,
            y: 50,
            width: 500,
            height: 100,
            rotation: 0,
            type: "any",
            text: "Close To The Sun",
            font_size: 40,
            color: "rgb(164, 45, 251)",
            text_shadow: "rgb(37, 37, 37) 0px 0px 10px",
        }
    );

    new ParticleFlow(
        {
            id: "particle_flow",
            layer: 5,
            x: 0,
            y: 0,
            width: 1280,
            height: 720,
            particle_radius_range: [3, 4],
            type: "radial",
            center: {
                x: 640,
                y: 360,
            },
            particle_direction: 0,
            max_spawn_probability: 0.4,
            color: "#f6f6f6",
        }
    );

    new ParticleFlow(
        {
            id: "particle_flow_directional",
            layer: 5,
            x: 0,
            y: 0,
            width: 1280,
            height: 720,
            particle_radius_range: [1, 2],
            type: "directional",
            center: {
                x: 640,
                y: 360,
            },
            particle_direction: 5.93,
            max_spawn_probability: 0.80,
            color: "#f6f6f6",
        }
    );

    new Image(
        {
            id: "ground",
            layer: 40,
            x: 390,
            y: 110,
            width: 500,
            height: 500,
            rotation: 0,
            background: "rgba(100,100,100,0.5)",
            size: "",
            border_radius: "250px",
            box_shadow: "0px 0px 10px white",
        }
    );

    new Visualizer(
        {
            id: "hills",
            layer: 40,
            x: 0,
            y: 570,
            width: 1280,
            height: 150,
            rotation: 0,
            radius: 0,
            type: "straight",
            points_count: 200,
            analyser_range: [0, 700],
            color: "#1daefc",
            bar_thickness: 3,
            border_radius: "50% 50% 0 0 / 100% 100% 0 0",
            box_shadow: "0px 0px 0px 2px #007eb9",
        }
    );

    new Timer(
        {
            id: "timer",
            layer: 50,
            x: -250,
            y: 300,
            width: 550,
            height: 10,
            rotation: 90,
            type: "bar",
            color: "rgb(255, 151, 77)",
            border_to_bar_space: 4,
            border_thickness: 2,
            border_radius: "10px",
            box_shadow: "rgb(35, 35, 35) 0px 0px 10px",
        }
    );

    new Text(
        {
            id: "time",
            layer: 100,
            x: 0,
            y: 500,
            width: 500,
            height: 100,
            rotation: 0,
            type: "time",
            text: "Close To The Sun",
            font_size: 30,
            color: "rgb(65, 204, 41)",
            text_shadow: "rgb(37, 37, 37) 0px 0px 10px",
        }
    );

}