const shapes = [
    {
        id : "cube",
        name: "Cube",
        type: "Polyhedron",
        price: 20.99,
        description: "With six faces, twelve equal edges and eight verticies, this is a real cube just as you remember it",
        colours: [
            {
            class:"Green",
            colours:[
                {
                name: "Hops Sack",
                hex: "#98824c"
                },
                {
                name: "Allo Vera",
                hex: "#727B61"
                },
                {
                name: "Allotment",
                hex: "#666740"
                },
            ]
            }
        ],
        images: [
            '/productImages/image1.jpg',
            '/productImages/image2.jpg',
            '/productImages/image3.jpg',
            '/productImages/image4.jpg'
        ]
    },
    {
        id : "tetrahedron",
        name: "Tetrahedron",
        type: "Polyhedron",
        price: 14.99,
        colours: [
            {
            class:"Neutral",
            colours:[
                {
                name: "Butler's Sink",
                hex: "#DEDDD7"
                },
                {
                name: "Clotted Cream",
                hex: "#EAE8E1"
                },
                {
                name: "Dipped Biscuit",
                hex: "#cbb395"
                },
            ]
            }
        ]
    },
    {
        id : "torus",
        name: "Torus",
        type: "Not Polyhedron",
        price: 54.99,
        colours: [
            {
            class:"Blue",
            colours:[
                {
                name: "Cook Book Blue",
                hex: "#3B4B63 "
                },
                {
                name: "Blue Dungarees",
                hex: "#758b98"
                },
                {
                name: "Breezy",
                hex: "#a5bdca "
                },
            ]
            }
        ]
    }
]

export default shapes