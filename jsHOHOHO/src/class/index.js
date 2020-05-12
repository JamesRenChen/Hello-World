class Car {
    constructor (options) {
        const { doors = 4, state = 'new', color = 'black' } = options
        this.doors = doors
        this.state = state
        this.color = color
    }
}

class Truck {
    constructor(options) {
        const {wheelSize = 'medium', state = 'used', color = 'silver'} = options
        this.wheelSize = wheelSize
        this.state = state
        this.color = color
    }
}

class VehicleFactory {
    creatVehicle (options) {
        switch (options.type) {
            case 'car':
                this.vehicleTarget = Car
                break
            case 'truck':
                this.vehicleTarget = Truck
                break
            default:
                this.vehicleTarget = Car
                break
        }
        return new this.vehicleTarget(options)
    }
}

let factory = new VehicleFactory()

let instance1 = factory.creatVehicle({
    type: 'car',
    color: 'yellow',
    doors: 2
})

let instance2 = factory.creatVehicle({
    type: 'truck',
    state: 'new',
    wheelSize: 'samll'
})

console.log(instance1 instanceof Car)
console.log(instance2 instanceof Truck)