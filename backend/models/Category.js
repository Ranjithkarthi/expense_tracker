const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Same as transactions: income or expense
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);
