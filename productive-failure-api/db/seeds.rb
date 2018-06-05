# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

patterns = Pattern.create(
    [
        {
            pattern: "circle-triangle-square-square-circle-triangle-square-square-circle-triangle-square-square-circle-triangle-square-square"
        }, {
            pattern: "square-circle-triangle-square-circle-triangle-square-circle-triangle-square-circle-triangle-quare-circle-triangle-square"
        }, {
            pattern: "circle-circle-triangle-square-circle-circle-triangle-square-circle-circle-triangle-square-circle-circle-triangle-square"
        }, {
            pattern: "circle-square-triangle-circle-square-triangle-circle-square-triangle-circle-square-triangle-circle-square-triangle-triangle"
        }
    ]
)

iteration_consolidations = IterationConsolidation.create(
    [
        {
            pattern: "circle-circle-triangle-square-circle-circle-triangle-square-circle-circle-triangle-square",
            rep1: "<svg xmlns='http://www.w3.org/2000/svg' width='391' height='78' viewBox='0 0 391 78'> <rect width='398' height='78' x='0' y='0' fill='#fff' /> <g transform='translate(-154, -101)'> <ellipse cx='188' cy='135' rx='31' ry='31' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /><ellipse cx='289' cy='143' rx='32' ry='32' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /><polygon fill='#000' points='440,163 410,109 380,163' stroke='hsla(0, 0%, 0%, 1)' stroke-width='5'/><rect x='483.5' y='114.5' width='41' height='41' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /> </g> </svg>",
            rep3: "<svg xmlns='http://www.w3.org/2000/svg' width='NaN' height='111' viewBox='0 0 NaN 111'> <rect width='522' height='111' x='0' y='0' fill='#fff' /> <g transform='translate(-62, -96)'> <text x='62' y='96'   fill='hsla(0, 0%, 0%, 1)' style='font: bold 32px sans-serif;'> <tspan x='62' dy='0' alignment-baseline='text-before-edge'> draw two circles, one triangle and  </tspan><tspan x='62' dy='1.2em' alignment-baseline='text-before-edge'> one square. </tspan><tspan x='62' dy='1.2em' alignment-baseline='text-before-edge'> repeat three times </tspan> </text> </g> </svg>",
            rep4: "<svg xmlns='http://www.w3.org/2000/svg' width='NaN' height='148' viewBox='0 0 NaN 148'> <rect width='458' height='148' x='0' y='0' fill='#fff' /> <g transform='translate(-104, -80)'> <text x='104' y='80'   fill='hsla(0, 0%, 0%, 1)' style='font: bold 32px sans-serif;'> <tspan x='104' dy='0' alignment-baseline='text-before-edge'> circle, circle, triangle, square, </tspan><tspan x='104' dy='1.2em' alignment-baseline='text-before-edge'> circle, circle, triangle, square, </tspan><tspan x='104' dy='1.2em' alignment-baseline='text-before-edge'> circle, circle, triangle, square, </tspan><tspan x='104' dy='1.2em' alignment-baseline='text-before-edge'> circle, circle, triangle, square </tspan> </text> </g> </svg>",
            rep5: "<svg xmlns='http://www.w3.org/2000/svg' width='275' height='85' viewBox='0 0 275 85'> <rect width='281' height='85' x='0' y='0' fill='#fff' /> <g transform='translate(-130, -131)'> <ellipse cx='159' cy='163' rx='26' ry='26' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /><ellipse cx='236' cy='164' rx='25' ry='25' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /><polygon fill='#000' points='332.5,183 308,138 283.5,183' stroke='hsla(0, 0%, 0%, 1)' stroke-width='5'/><rect x='356.5' y='134.5' width='49' height='49' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /> </g> </svg>",
            rep6: "<svg xmlns='http://www.w3.org/2000/svg' width='NaN' height='77' viewBox='0 0 NaN 77'> <rect width='296' height='77' x='0' y='0' fill='#fff' /> <g transform='translate(-86, -104)'> <ellipse cx='120' cy='138' rx='31' ry='31' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /><text x='169' y='118'   fill='hsla(0, 0%, 0%, 1)' style='font: bold 32px sans-serif;'> <tspan x='169' dy='0' alignment-baseline='text-before-edge'> x 2 </tspan> </text><polygon fill='#000' points='298.5,170 265,115 231.5,170' stroke='hsla(0, 0%, 0%, 1)' stroke-width='5'/><rect x='318.5' y='107.5' width='61' height='61' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /> </g> </svg>",
            rep2: "<svg xmlns='http://www.w3.org/2000/svg' width='275' height='85' viewBox='0 0 275 85'> <rect width='281' height='85' x='0' y='0' fill='#fff' /> <g transform='translate(-130, -131)'> <ellipse cx='159' cy='163' rx='26' ry='26' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /><ellipse cx='236' cy='164' rx='25' ry='25' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /><polygon fill='#000' points='332.5,183 308,138 283.5,183' stroke='hsla(0, 0%, 0%, 1)' stroke-width='5'/><rect x='356.5' y='134.5' width='49' height='49' stroke='hsla(0, 0%, 0%, 1)' fill='#000' stroke-width='5' /> </g> </svg>"
        }
    ]
)
