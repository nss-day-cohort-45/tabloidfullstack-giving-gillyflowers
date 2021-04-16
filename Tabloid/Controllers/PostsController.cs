using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostsController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("userProfileId/{userProfileId}")]
        public IActionResult GetPostByUserProfileId(int userProfileId)
        {
            var posts = _postRepository.GetPostByUserProfileId(userProfileId);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        // Need to update the PublishedDateTime and isApproved when we start the admin approval ticket.
        [HttpPost]
        public IActionResult AddPost(Post post)
        {
            DateTime dateCreated = DateTime.Now;

            post.CreateDateTime = dateCreated;
            post.PublishDateTime = dateCreated;
            post.IsApproved = true;

            _postRepository.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.UpdatePost(post);
            return NoContent();
        }

        // Need to implement cascade DELETE to PostReaction, Comment, PostTag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }
    }
}
