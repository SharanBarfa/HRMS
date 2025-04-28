import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewPeriod: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  ratings: {
    productivity: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    quality: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    jobKnowledge: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    communication: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    teamwork: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    initiative: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 5
  },
  goals: [{
    description: String,
    targetDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending'
    }
  }],
  strengths: [String],
  areasForImprovement: [String],
  comments: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'reviewed', 'acknowledged'],
    default: 'draft'
  },
  acknowledgement: {
    acknowledged: {
      type: Boolean,
      default: false
    },
    date: Date,
    comments: String
  }
}, {
  timestamps: true
});

// Calculate overall rating before saving
performanceSchema.pre('save', function(next) {
  const ratings = this.ratings;
  const sum = ratings.productivity + ratings.quality + ratings.jobKnowledge + 
              ratings.communication + ratings.teamwork + ratings.initiative;
  
  this.overallRating = Math.round((sum / 6) * 10) / 10; // Round to 1 decimal place
  
  next();
});

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;
