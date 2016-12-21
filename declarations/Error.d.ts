declare module "test" {
    global {
        interface ErrorConstructor {
            status?: number
        }
    }
}