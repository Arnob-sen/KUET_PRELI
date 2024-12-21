# Banglish to Bengali Transliteration

This project implements a neural machine translation model to convert Banglish (Bengali written in English letters) to proper Bengali script.

## Technologies and Tools Used

### Programming Languages
- Python 3.10+

### Main Libraries and Frameworks
- PyTorch: Deep learning framework
- Transformers (Hugging Face): For pre-trained models and tokenizers
- Datasets: For loading and processing the Hugging Face dataset
- NumPy: For numerical computations
- Pandas: For data manipulation

### Models and Architecture
- MT5 (Multilingual T5) model: Pre-trained transformer model
- Sequence-to-sequence architecture with attention mechanism

### Development Tools
- Kaggle: For GPU-accelerated model training
- Jupyter Notebook: For interactive development
- Git: For version control

### Dataset
The model uses the [SKNahin/bengali-transliteration-data](https://huggingface.co/datasets/SKNahin/bengali-transliteration-data) dataset from Hugging Face.

## Setup and Dependencies

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

Key dependencies:
- transformers>=4.30.0
- torch>=2.0.0
- datasets>=2.12.0
- numpy>=1.24.0
- pandas>=2.0.0

## Model Architecture Details

- Base Model: MT5 (Multilingual Text-to-Text Transfer Transformer)
- Training Strategy: Fine-tuning on Banglish-Bengali pairs
- Optimization: AdaFactor optimizer with learning rate scheduling
- Mixed Precision Training: FP16 for efficient GPU utilization

## Training Configuration

- Training/Validation Split: 90/10
- Batch Size: 16 (with gradient accumulation)
- Learning Rate: 5e-5
- Number of Epochs: 3
- Weight Decay: 0.01
- Gradient Clipping: Yes
- Early Stopping: Enabled

## Performance Optimization

- Gradient Checkpointing: For memory efficiency
- Mixed Precision Training: For faster computation
- Batch Size Optimization: Based on GPU memory
- Memory Management: CUDA memory optimization

## Project Structure

- `banglish_to_bengali.py`: Main script containing the model implementation and training code
- `requirements.txt`: List of Python dependencies
- `banglish_bengali_model/`: Directory where the trained model will be saved

## Usage

After training, you can use the model to translate Banglish text to Bengali. The script includes a simple example at the end of the training process.