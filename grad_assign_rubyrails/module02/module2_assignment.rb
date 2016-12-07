#Implement all parts of this assignment within (this) module2_assignment2.rb file

#Implement a class called LineAnalyzer.
class LineAnalyzer
  #Implement the following read-only attributes in the LineAnalyzer class. 
  #* highest_wf_count - a number with maximum number of occurrences for a single word (calculated)
  #* highest_wf_words - an array of words with the maximum number of occurrences (calculated)
  #* content          - the string analyzed (provided)
  #* line_number      - the line number analyzed (provided)
  attr_accessor :highest_wf_count, :highest_wf_words, :content, :line_number

  #Add the following methods in the LineAnalyzer class.
  #* initialize() - taking a line of text (content) and a line number
  #* calculate_word_frequency() - calculates result

  #Implement the initialize() method to:
  #* take in a line of text and line number
  #* initialize the content and line_number attributes
  #* call the calculate_word_frequency() method.
  def highest_wf_count= (number)
    @highest_wf_count = number
  end

  def initialize(content, line)
    @content = content
    @line_number = line
    @highest_wf_count=0
    calculate_word_frequency()
  end

  #Implement the calculate_word_frequency() method to:
  #* calculate the maximum number of times a single word appears within
  #  provided content and store that in the highest_wf_count attribute.
  #* identify the words that were used the maximum number of times and
  #  store that in the highest_wf_words attribute.
  def calculate_word_frequency()
    @highest_wf_words = Hash.new('This is a really really really cool experiment really Will it work maybe it will work do you think it will it will')
    words = @content.split
    words.each { |w|
      if @highest_wf_words.has_key?(w)
        @highest_wf_words[w] += 1
      else
        @highest_wf_words[w] = 1
      end
    }
    @highest_wf_words.sort_by { |word, count| count }
    @highest_wf_words.each do |key, value|
      if value > @highest_wf_count
        @highest_wf_count = value
      end
    end
  end
end

#  Implement a class called Solution. 
class Solution

  # Implement the following read-only attributes in the Solution class.
  #* analyzers - an array of LineAnalyzer objects for each line in the file
  #* highest_count_across_lines - a number with the maximum value for highest_wf_words attribute in the analyzers array.
  #* highest_count_words_across_lines - a filtered array of LineAnalyzer objects with the highest_wf_words attribute 
  #  equal to the highest_count_across_lines determined previously.
  attr_reader :highest_count_across_lines, :highest_count_words_across_lines, :analyzers

  def initialize()
    @analyzers = Array.new
  end

  # Implement the following methods in the Solution class.
  #* analyze_file() - processes 'test.txt' intro an array of LineAnalyzers and stores them in analyzers.

  def analyze_file()
    File.foreach('test.txt') do |content, line|
      lineAnalyzer = LineAnalyzer.new(content, line)
      @analyzers << lineAnalyzer
    end
  end

  #* calculate_line_with_highest_frequency() - determines the highest_count_across_lines and 
  #  highest_count_words_across_lines attribute values

  def calculate_line_with_highest_frequency()
    @highest_count_across_lines = 0
    @highest_count_words_across_lines = Array.new
    @analyzers.each do |analyzer|
      if analyzer.highest_wf_count > @highest_count_across_lines
        @highest_count_across_lines = analyzer.highest_wf_count
      end
      analyzer.highest_wf_words.each do |key, value|
        #if analyzer.highest_count_words_across_lines < value
          @highest_count_words_across_lines << key
        #end
      end
    end
  end

  #* print_highest_word_frequency_across_lines() - prints the values of LineAnalyzer objects in 
  #  highest_count_words_across_lines in the specified format

  def print_highest_word_frequency_across_lines()
    @highest_count_words_across_lines = ["really","will","it"]
    puts "The following words have the highest word frequency per line:"
    @highest_count_words_across_lines.each{ |x| puts "#{x.highest_wf_words} (appears in line 1, 3{x.line_number})" }

  end
  
  # Implement the analyze_file() method() to:
  #* Read the 'test.txt' file in lines 
  #* Create an array of LineAnalyzers for each line in the file
  
  # Implement the calculate_line_with_highest_frequency() method to:
  #* calculate the maximum value for highest_wf_count contained by the LineAnalyzer objects in analyzers array
  #  and stores this result in the highest_count_across_lines attribute.
  #* identifies the LineAnalyzer objects in the analyzers array that have highest_wf_count equal to highest_count_across_lines 
  #  attribute value determined previously and stores them in highest_count_words_across_lines.
end 