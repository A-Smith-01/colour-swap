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
            '/productImages/cube/image1.jpg',
            '/productImages/cube/image2.jpg',
            '/productImages/cube/image3.jpg',
            '/productImages/cube/image4.jpg'
        ]
    },
    {
        id : "tetrahedron",
        name: "Tetrahedron",
        type: "Polyhedron",
        price: 14.99,
        description: "With four triangular faces, six edges and four verticies, this simple shape is a classic",
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
        ],
        images: [
            '/productImages/tetrahedron/image1.jpg',
            '/productImages/tetrahedron/image2.JPG',
            '/productImages/tetrahedron/image3.png',
            '/productImages/tetrahedron/image4.png'
        ]
    },
    {
        id : "torus",
        name: "Torus",
        type: "Not Polyhedron",
        price: 54.99,
        description: "A doughnut shape with a hole in the middle, perfect for stacking and rolling",
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
        ],
        images: [
            '/productImages/torus/image1.png',
            '/productImages/torus/image2.webp',
            '/productImages/torus/image3.png',
            '/productImages/torus/image4.png'
        ]
    }
]

export default shapes