use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = fibonacci(0);
        assert_eq!(result, 0);
    }
}
